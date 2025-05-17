// pages/Home.jsx
import { Button, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');

  const createMeeting = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  return (
    <Container className="text-center mt-5">
      <h2>Welcome to GWS Meet</h2>
      <Button color="primary" onClick={createMeeting} className="m-2">Create Meeting</Button>
      <Input placeholder="Enter Room Code" value={roomCode} onChange={e => setRoomCode(e.target.value)} />
      <Button color="success" onClick={() => navigate(`/room/${roomCode}`)} className="mt-2">Join</Button>
    </Container>
  );
}