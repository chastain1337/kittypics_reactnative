import Home from "./components/Home"
import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Home />
        </Layout>
      </ApplicationProvider>
    </>
  );
}
