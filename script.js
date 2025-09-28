let myIdInput = document.getElementById('myId');
let myId = myIdInput.value || 'walkie-' + Math.floor(Math.random() * 10000);

// PeerJS Cloud Server 
const peer = new Peer(myId, {
  host: '0.peerjs.com', // server pubblico gratuito
  port: 443,
  secure: true
});

const remoteAudio = document.getElementById('remoteAudio');

// Aggiorna l'ID mostrato quando il peer è pronto
peer.on('open', id => {
  myIdInput.value = id;
});

let localStream;
async function getLocalStream() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
}
getLocalStream();

// Rispondere alle chiamate in arrivo
peer.on('call', call => {
  call.answer(localStream);
  call.on('stream', remoteStream => {
    remoteAudio.srcObject = remoteStream;
  });
});

// Chiama un altro peer
document.getElementById('callBtn').onclick = () => {
  const peerId = document.getElementById('peerId').value;
  if (!peerId) return alert('Inserisci l’ID del peer!');
  const call = peer.call(peerId, localStream);
  call.on('stream', remoteStream => {
    remoteAudio.srcObject = remoteStream;
  });
};
