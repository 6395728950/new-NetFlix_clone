 
import { useSelector } from 'react-redux';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import usePopularMoies from '../hooks/usePopularMoies';
import useTopratedMovies from '../hooks/useTopratedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import Gptsearch from './Gptsearch';
import Headr from './Headr';
import Maincontainer from './Maincontainer';
import SecondaryContainer from './SecondaryContainer';
 

const Browse = () => {
  const ShowGptSearch = useSelector((store) =>store.gpt.showgptsearch);
 useNowPlayingMovies();
 usePopularMoies();
 useUpcomingMovies();
 useTopratedMovies();
 
  return (
    <div>
      <Headr></Headr>
      {ShowGptSearch ?  (<Gptsearch/>): (<>  <Maincontainer></Maincontainer>
        <SecondaryContainer></SecondaryContainer></>)}
      
     
      
    </div>
     
  );
};

export default Browse;