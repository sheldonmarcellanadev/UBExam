import * as React from "react";
import { View, Text, Image } from "react-native";
import { RandomUser } from "./HomeScreen";

interface ProfileScreenProps {
  navigation: {
    setOptions:  ((title: any) => void | null) | undefined;
  };
  route: {
    params: RandomUser
  };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.first_name + " " + route.params.last_name,
    });
  }, [route]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={{ width: "100%", height: 200, marginTop: 30 }}
        source={{ uri: route.params.avatar }}
      />
      <Text style={{ paddingTop: 20 }}>
        First name: {route.params.first_name}
      </Text>
      <Text>Last name: {route.params.last_name}</Text>
      <Text>Username: {route.params.username}</Text>
      <Text>Email: {route.params.email}</Text>
      <Text>Gender: {route.params.gender}</Text>
      <Text>Phone number: {route.params.phone_number}</Text>
      <Text style={{ textAlign: "center", paddingHorizontal: 30 }}>
        Address:{" "}
        {route.params.address.street_name +
          ", " +
          route.params.address.street_address +
          ", " +
          route.params.address.city +
          ", " +
          route.params.address.state +
          ", " +
          route.params.address.country +
          ", " +
          route.params.address.zip_code}
      </Text>
    </View>
  );
};

export default ProfileScreen;
