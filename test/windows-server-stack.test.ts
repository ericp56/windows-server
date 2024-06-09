import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';
import * as Windows from '../lib/windows-server-stack';

test('EC2 Instance Created', () => {
    const app = new App();
    // WHEN
    const stack = new Windows.WindowsServerStack(app, 'WindowsServerStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::EC2::Instance"));
});
