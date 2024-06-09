#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { WindowsServerStack } from '../lib/windows-server-stack';

const app = new App();
new WindowsServerStack(app, 'WindowsServerStack');
