echo "cloning repo and installing server"
cd curapp
git pull
cd backend
npm i
echo "killing previous node processes"
ps aux | grep " node " | grep -v grep
nodepids=$(ps aux | grep " node " | grep -v grep | cut -c10-15)
for nodepid in ${nodepids[@]}
do
echo "Stopping PID :"$nodepid
kill -9 $nodepid
done
echo "running node server"
nohup node server.js > output.log &
exit 0