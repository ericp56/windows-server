import * as fs from 'fs';

export const getUserDataScript = (): string =>
    fs.readFileSync('lib/resources/Run-UserData.ps1', 'utf8');

export const buildUserDataCommands = (): string[] => {
    const commands: string[] = [];
    const {
        USER_ID: userId,
        USER_PASSWORD: userPassword
    } = process.env;

    if (!userId || !userPassword) {
        throw new Error('Please provide creds for a new windows login account user USER_ID and USER_PASSWORD');
    }

    const userData = Buffer
    .from(getUserDataScript(), 'utf-8')
    .toString();

    commands.push(`$userPassword = "${userPassword}"`);
    commands.push(`$userId = "${userId}"`);
    commands.push(userData);

    return commands;
}

