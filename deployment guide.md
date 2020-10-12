# Deployment Commands

## IP Addresses
Public IP Address: `88.80.186.99`

## Guides used:
[Install Nginx](https://www.linode.com/docs/web-servers/nginx/how-to-install-nginx-ubuntu-18-04/)

[Deploy React 1](https://www.linode.com/community/questions/18293/how-do-i-deploy-a-react-application-to-my-linode)

[Deploy React 2](https://www.linode.com/docs/development/react/deploy-a-react-app-on-linode/)


## SSH commnad to Linode
```bash
ssh root@88.80.186.99
```

## Ubuntu Accounts

### Root password:

`imaginethis101`

### Deployment Account: 
This is used within the deploy script

[Tutorial for Ubuntu Account](https://www.linode.com/docs/security/securing-your-server/)

```bash
adduser deploy
adduser deploy sudo
```

un: `deploy`

pw: `imaginethis101`

## Prerequisites installs
### Nginx
```bash
sudo apt update
sudo apt install nginx
```
### Node & NPM
```bash
sudo apt install nodejs
sudo apt install npm
```

## Nginx & Config
[Tutorial Reference](https://www.linode.com/docs/web-servers/nginx/how-to-install-nginx-ubuntu-18-04/)

create folder to hold web app

```bash
sudo mkdir /var/www/88.80.186.99
```

Allow all users to modify the folder
```bash
sudo chmod 755 -R /var/www/88.80.186.99
```

Disable the default configuration file by removing the symlink in /etc/nginx/sites-enabled/:

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

Create the Nginx config file using nano (or vim)

Stored in: `/etc/nginx/sites-available`

File name: `88.80.186.99`

*The filename will need to be the name of the IP address or Domain.*

```shell-script
server {
    listen  80;
    listen [::]:80;
    server_name 88.80.186.99;

    root /var/www/88.80.186.99/imaginethisweb/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Relink
```bash
sudo ln -s /etc/nginx/sites-available/88.80.186.99 /etc/nginx/sites-enabled/
```

Test Config for errors:
```bash
sudo nginx -t
```

Reload & restart the configuration:
```bash
sudo nginx -s reload
sudo systemctl restart nginx
```

## Deploy Script - This is already in the imaginethisweb repo
root of project repo within your local copy (i.e. not on the server)

within the file replace deploy@88.80.186.99 with username and ip address of the server

file name: `deploy`
```
#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Installing dependencies"
npm install

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP build/ deploy@88.80.186.99:/var/www/88.80.186.99/
echo "Deployment complete"
```

##  rSync changes to Linode

Make sure to run the commnad from your local machine, not in Linode

[rSync Tutorial 1](https://www.linode.com/docs/tools-reference/tools/introduction-to-rsync/)

[rSync Tutorial 2](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps)

Synced to `/var/www/88.80.186.99`

From local git repo:
```bash
rsync -a /Users/jeremychang/git/imaginethisweb root@88.80.186.99:/var/www/88.80.186.99
```

Make the file runable
```bash
sudo chmod u+x deploy
```

On Nginx Server in `/var/www/88.80.186.99`:

Run the deploy script
```bash
./deploy
```


## Instructions for Redeployment
1. Navigate to project and rsync changes

```bash
rsync -a /Users/jeremychang/git/imaginethisweb root@88.80.186.99:/var/www/88.80.186.99
```
Will need to enter __root__ password

2. SSH into Linode Server

Navigate to `/var/www/88.80.186.99/imaginethisweb` folder

3. Make deploy file executeable 
```bash
sudo chmod u+x deploy
```
4. Run deploy file
```bash
./deploy
```