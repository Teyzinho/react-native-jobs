import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Mostrar Todos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Algo deu Errado</Text>
        ) : (
          <FlatList 
          keyExtractor={item => item?.job_id}
            data={[1,2,3,4]}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
            renderItem={(item) => (
              <PopularJobCard 
                item={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
