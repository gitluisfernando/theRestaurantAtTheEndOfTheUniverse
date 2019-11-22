sudo apt install -y autoconf automake build-essential python-dev libtool libssl-dev pkg-config
cd /tmp
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
./autogen.sh 
./configure 
make
sudo make install