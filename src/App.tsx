import VideoCarousel from './components/Carousel'
import './App.css';
import { sampleVideos } from './utils';
import CallToAction from './components/CallToAction';
import Nav from './components/Nav';
import InfoBar from './components/InforBar';

function App() {

  return (
    <>
    <InfoBar/>
    <Nav/>
    <VideoCarousel sampleVideos={sampleVideos} />
    <CallToAction/>
    </>
  )
}

export default App
