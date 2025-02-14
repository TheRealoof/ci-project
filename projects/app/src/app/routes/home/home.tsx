import Analyzer from '../../components/analyzer/analyzer';
import { Header } from '../../components/header/header';
import { Messages } from '../../components/messages/messages';

export function Home() {

  return (
    <>
      <Header/>
      <div className="container mt-5">
        <h1>NO RACISMO</h1>
        <div>
          <Analyzer/>
          <Messages/>
        </div>
      </div>
    </>
  );
}
