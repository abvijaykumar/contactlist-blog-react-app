#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 755 /home/ec2-user/contacts-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/contacts-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


#install node modules
npm install
npm install pm2 -g

#start our node app in the background
# sudo npm start &
sudo pm2 start npm -- start