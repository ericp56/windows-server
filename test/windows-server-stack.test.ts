import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';
import * as Windows from '../lib/windows-server-stack';

test('EC2 Instance Created',async () => {
    const app = new App();
    const stack = await new Windows.WindowsServerStack(app, 'WindowsServerStack', undefined, '10.10.10.10');

    expectCDK(stack).to(haveResource("AWS::EC2::Instance"));
});
