import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [randomUsers, setRandomUsers] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    fetch("https://random-data-api.com/api/users/random_user?size=10")
      .then((response) => response.json())
      .then((json) => {
        setRandomUsers(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderPagination = (index, total, _context) => {
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
      {randomUsers.map((user) => (
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
