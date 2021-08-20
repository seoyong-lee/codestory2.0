import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import { useState } from 'react';
import {axios} from 'axios';

export default function Home({ loginHandler, isLogin }) {

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else if (e === 0 || e === 2) {
      setIsWhite(false);
    }
  };

  const [component, setComponent] = useState(<Landing colorHandler={colorHandler} />);
  const [isWhite, setIsWhite] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  
  const componentHandler = (e) => {
    setComponent(e);
  };

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      {component.type.name === 'Landing' ? <Landing colorHandler={colorHandler} /> : component }
      {isLoginOpen 
        ? <Login isWhite={isWhite} 
          loginOpenHandler={loginOpenHandler}
          loginHandler={loginHandler}
        /> 
        : null
      }
      <Footer isWhite={isWhite}/>
      <Nav componentHandler={(e) => componentHandler(e)} 
        isWhite={isWhite}
        loginOpenHandler={loginOpenHandler}
        colorHandler={colorHandler}
        isLogin={isLogin}
        loginHandler={loginHandler}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    console.log('ssr작동하니?');
    const { data } = await axios.get('api/user', { 
      headers: { cookie: `accessToken=${context.req.cookies.accessToken}` } 
    }).then((res) => res.json());
    console.log(data);
    return {
      props: {
        isLogin: true,
        username: data.username
      }
    };
  }
  catch {
    return {
      props: {
        isLogin: false
      }
    };
  }
}