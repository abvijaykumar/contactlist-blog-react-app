#!/bin/bash


sudo chmod -R 777 /home/ec2-user/contacts-app
cd /home/ec2-user/contacts-app

export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

npm install pm2 -g

npm install

# sudo npm start &
sudo pm2 start npm -- start