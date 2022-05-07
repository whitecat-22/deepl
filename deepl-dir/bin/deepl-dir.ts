#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeeplDirStack } from '../lib/deepl-dir-stack';

const app = new cdk.App();
new DeeplDirStack(app, 'DeeplDirStack');
