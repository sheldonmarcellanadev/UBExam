import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

interface HomeScreenProps {
  navigation: {
    navigate:  ((screen: string, params: Object) => void | null) | undefined;
  };
}

export interface RandomUser {
  id: number
  uid: string
  password: string
  first_name: string
  last_name: string
  username: string
  email: string
  avatar: string
  gender: string
  phone_number: string
  social_insurance_number: string
  date_of_birth: string
  employment: Employment
  address: Address
  credit_card: CreditCard
  subscription: Subscription
}

interface Employment {
  title: string
  key_skill: string
}

interface Address {
  city: string
  street_name: string
  street_address: string
  zip_code: string
  state: string
  country: string
  coordinates: Coordinates
}

interface Coordinates {
  lat: number
  lng: number
}

interface CreditCard {
  cc_number: string
}

interface Subscription {
  plan: string
  status: string
  payment_method: string
  term: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [randomUsers, setRandomUsers] =  useState<Array<RandomUser>>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    fetch("https://random-data-api.com/api/users/random_user?size=10")
      .then((response: any) => response.json())
      .then((json: RandomUser[]) => {
        setRandomUsers(json);
      })
      .catch((error: any) => console.error(error));
  }, []);

  const renderPagination = (index: number, total: number) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: "black" }}>
          <Text style={styles.paginationText}>{(index + 1).toFixed()}</Text>/
          {total}
        </Text>
      </View>
    );
  };

  return (
    <Swiper
      style={styles.wrapper}
      renderPagination={renderPagination}
      loop={false}
      index={activeItemIndex}
      onMomentumScrollEnd={(e) =>
        setActiveItemIndex(e.nativeEvent.contentOffset.x / width)
      }
    >
      {randomUsers.map((user: RandomUser) => (
        <TouchableOpacity
          key={user.id}
          style={styles.slide}
          onPress={() => navigation.navigate("Profile", user)}
        >
          <Image style={styles.image} source={{ uri: user.avatar }} />
          <Text
            numberOfLines={1}
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            {user.first_name + " " + user.last_name}
          </Text>
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const styles = {
  wrapper: {},
  slide: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    marginTop: 30,
    width,
    height: 200,
  },
  paginationStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: "black",
    fontSize: 20,
  },
};

export default HomeScreen;
