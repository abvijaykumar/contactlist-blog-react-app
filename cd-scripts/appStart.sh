#!/bin/bash


sudo chmod -R 777 /home/ec2-user/contacts-app
cd /home/ec2-user/contacts-app

export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


echo "Installing pm2"
sudo npm install -g pm2
sudo npm install -g serve

echo "Installing other packages"
npm install


echo "----Starting the Server---"
echo $PATH
# sudo npm start &
export NODE_OPTIONS=--openssl-legacy-provider
npm run build 
pm2 stop contactlist-app
pm2 serve build/ 8082 --name "contactlist-app" --spa

#pm2 start npm -- start