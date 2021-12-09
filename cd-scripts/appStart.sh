#!/bin/bash


sudo chmod -R 777 /home/ec2-user/contacts-app
cd /home/ec2-user/contacts-app

export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


echo "Installing pm2"
npm install pm2 -g

echo "Installing other packages"
npm install


echo "----Starting the Server---"
# sudo npm start &
sudo pm2 start npm -- start