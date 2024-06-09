# Quick development station

This project quickly provisions an Amazon AWS Windows instance for general usage.  If you leave it on, it will cost around $50/month.  If you provision it, use it and destroy it after every session, it can cost under $1/month.  The machine is set up in its own private network, so you don't have to worry about internet exposure.

#### Examples of usage:
* Windows Programming and Development
* VPN access to customer sites

#### Some things to note:
* This project is set up to provision a Windows Standard server with 2 CPU and 4G RAM ($0.06/hour).  You can change the parameters of the stack's ```new ec2.Instance``` for other windows server types and more machine.
* This project retrieves your public IP address via api.ipify.org, and opens access for your address to Remote Desktop on the server.  That means any machine on your local network will be able to access the server.
* This project creates a user and password on the server instance, so you don't have to provide an AWS key to retrieve the Administrator password.
* After you create and destroy the session, there will be artifacts left in an S3 bucket, and in CloudFormation's deleted stacks.  It won't cost anything to leave them there, but you should periodically clean them up.

## Tools needed:

* NodeJs
* Amazon AWS CLI 


## Getting started

1. Install NodeJs
2. Sign up for Amazon AWS, install the AWS client and test the functionality with a simple command like:
```
aws --output table ec2 describe-instances
```
3. Clone this repo and switch to the project folder
```
git clone ...
cd ...
```
4. Install the node packages and deploy
```
npm i
export USER_ID=eric;export USER_PASSWORD=S@cretP-ssword # for Mac
set USER_ID="eric";set USER_PASSWORD="S@cretP-ssword" # for Windows
cdk deploy
```
5. Get the public IP address from the instance info
```
aws --output table ec2 describe-instances
```
you can search for the IP addreess by hitting '/' and then typing PublicI and 'Enter.'  Then, you can hit 'N' to move to the next instance (in case you have more than one public machine).  You can also try other --output formats to see which one works best for you.

## Useful AWS commands

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk destroy`     remove this stack from your AWS account
 * `aws ec2 describe-instances`     provide details on the ec2 instances in your account

