import {
  App,
  Stack,
  StackProps,
  Tags,
  aws_ec2 as ec2
} from 'aws-cdk-lib';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { buildUserDataCommands} from './utils';

const windowsServer = 'windows-server';

export class WindowsServerStack extends Stack {

  /**
   * see {@link see https://github.com/aws/aws-cdk/blob/ca16e79a934e340545f766b7047f4c09aedb8765/packages/%40aws-cdk/aws-ec2/lib/machine-image.ts#L170}
   * @param scope 
   * @returns 
   */
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    fetch('https://api.ipify.org').then(response => response.text()).then(x => this.buildEc2Stack(`${x}/32`));
    
  }
  
  
  private buildEc2Stack(myPublicIP = "10.10.10.10/32") {

    Tags.of(this).add('cost_center', 'winedows-server-stack');

    const rootVolume: ec2.BlockDevice = {
      deviceName: '/dev/sda1',
      volume: ec2.BlockDeviceVolume.ebs(50),
    };

    const vpc = new ec2.Vpc(this, windowsServer.concat('-vpc'), {
      ipAddresses: ec2.IpAddresses.cidr('192.168.0.0/16'),
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: windowsServer.concat('-1'),
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: windowsServer.concat('-2'),
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: windowsServer.concat('-3'),
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        }
      ]
    });

    const role = new Role(this, 'MyRole', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromManagedPolicyArn(
          this,
          `${windowsServer}-policy`,
          'arn:aws:iam::aws:policy/AmazonElasticFileSystemClientReadWriteAccess'
        )
      ]
    });

    const securityGroup = new ec2.SecurityGroup(this, windowsServer.concat('-sg'), {
      allowAllOutbound: true,
      allowAllIpv6Outbound: true,
      vpc
    });

    securityGroup.addIngressRule(
      ec2.Peer.ipv4(myPublicIP),
      ec2.Port.tcp(3389)
    );
    const instance1 = new ec2.Instance(this, windowsServer, {
      associatePublicIpAddress: true,
      blockDevices: [rootVolume],
      machineImage: ec2.MachineImage.latestWindows(ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
      role,
      securityGroup,
      vpc
    });

    buildUserDataCommands().forEach(x => instance1.addUserData(x));
  }
}
