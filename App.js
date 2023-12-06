import React, { useContext } from 'react'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './src/assets/common/Nav'

// Native Base
import { NativeBaseProvider, StatusBar } from 'native-base'
import theme from './src/theme/NativeBase'

// Redux
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { INITIALIZE_AUTH } from './src/redux/actions/actionTypes'

// Context API
import Auth from './src/context/store/Auth'
import AuthGlobal from './src/context/store/AuthGlobal'

// Components
import COLORS from './src/theme/COLORS'
import AuthStack from './src/auth/AuthStack'
import DashboardDrawer from './src/navigation/DashboardDrawer'

const AppContent = () => {

  const context = useContext(AuthGlobal)

  store.dispatch({
    type: INITIALIZE_AUTH,
    payload: {
      app: context.stateUser.app,
      user: context.stateUser.user,
      sites: context.stateUser.sites,
      modules: context.stateUser.modules
    }
  })

  return (
    <Provider store={store} >
      <DashboardDrawer />
    </Provider>
  )
}

const Authentication = () => {

  const context = useContext(AuthGlobal)

  return (
    context.stateUser.isAuthenticated ? <AppContent /> : <AuthStack />
  )
}

const App = () => {
  return (
    <Auth>
      <NativeBaseProvider theme={theme} >
        <NavigationContainer ref={navigationRef} >
          <Authentication />
          <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.backgroundColor} />
        </NavigationContainer>
      </NativeBaseProvider>
    </Auth>
  )
}

export default App