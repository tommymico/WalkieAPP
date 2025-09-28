let myIdInput = document.getElementById('myId');
let myId = myIdInput.value || 'walkie-' + Math.floor(Math.random() * 10000);

const peer = new Peer(myId);
const remoteAudio = document.getElementById('remoteAudio');

peer.on('open', id => {
  myIdInput.value = id;
});

let localStream;
async function getLocalStream() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
}
getLocalStream();

peer.on('call', call => {
  call.answer(localStream);
  call.on('stream', remoteStream => {
    remoteAudio.srcObject = remoteStream;
  });
});

document.getElementById('callBtn').onclick = () => {
  const peerId = document.getElementById('peerId').value;
  if (!peerId) return alert('Inserisci l’ID del peer!');
  const call = peer.call(peerId, localStream);
  call.on('stream', remoteStream => {
    remoteAudio.srcObject = remoteStream;
  });
};
