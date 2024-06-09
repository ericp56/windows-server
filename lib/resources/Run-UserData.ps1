# This script will run as a local admin during the first power-on.

# Create admin user so you don't have to look up Administrator password
$password = $userPassword | ConvertTo-SecureString -AsPlainText -Force
New-LocalUser -Name $userId -Password $password -Verbose
Add-LocalGroupMember -Group Administrators -Member $userId
