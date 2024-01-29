import React from 'react'
import { View,ActivityIndicator } from 'react-native'

export default function Loading() {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
  )
}