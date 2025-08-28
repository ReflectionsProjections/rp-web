#!/bin/bash
set -euo pipefail

echo "
              :=+****#**=.              
            :+*==-=+++***#+.            
           +*=---+**+++++**#=           
          =*-----+*++++++++*%-          
         .#------=+**++++++**%          
     .:==*#-------==++*+**###%+=-:      
   -++=--=#----------=*##+=-----=+++:   
 .*+-:::::#+---------+#=------------*+  
.#=:::::::-#+-------*#---------------+* 
*+:::::::::-*#+=---=#-----------------++
%-::::::::-==+*#*++##==--------======--%
%+-::::::-++++=+++*%*++**+----=========%
*#=======++++++++=+%=----+**=========-**
 **=++++++++++++=+#+-------+#=======-+#.
  +#++==+++++==+*#+---------+#======**. 
   :+***+++++**##+=----------#+=++*+:   
      :-=+%##**+++++=--------#*==:.     
          %*+++++++**+=------#.         
          -%+++++++++*+-----*=          
           =#*+++++++*=---=*=           
            .+#**++++=--=*+:            
              .=**#****+=:              
"
echo -e "\033[1m\033[36mStarting RP Web Container 🚀\033[0m"

mkdir -p /shared/logs

# Define workspaces (set via env vars)
declare -A WORKSPACES=(
    ["hype"]="$BUILD_HYPE"
    ["admin"]="$BUILD_ADMIN"
    ["info"]="$BUILD_INFO"
    ["site"]="$BUILD_SITE"
    ["sponsor"]="$BUILD_SPONSOR"
    ["dashboard"]="$BUILD_DASHBOARD"
)

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "\033[32m✓ $1\033[0m"
    else
        echo -e "\033[31m✗ $1 failed\033[0m"
        return 1
    fi
}

# Setup web dependencies
echo -e "\033[1mInstalling root web dependencies...\033[0m"
cd /shared
yarn install
check_status "Yarn install"

yarn prepare || echo "No prepare step found"
check_status "Yarn prepare"

# Start requested workspaces
for workspace in "${!WORKSPACES[@]}"; do
    if [[ "${WORKSPACES[$workspace]}" == "true" ]]; then
        echo -e "\033[1mStarting @rp/$workspace...\033[0m"
        mkdir -p "/shared/logs/$workspace"
        setsid bash -c "yarn workspace @rp/$workspace dev --host 2>&1 | tee /shared/logs/$workspace/$workspace.log" &
        check_status "@rp/$workspace started"
    fi
done

echo -e "\033[1m\033[32mAll requested web workspaces launched 🎉\033[0m"
echo -e "\033[1mLogs at: /shared/logs/\033[0m"

exec bash