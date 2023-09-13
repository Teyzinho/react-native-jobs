import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useCallback, useState } from "react";

import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { COLORS, icons, SIZES } from "../../constants";
import { useFetch } from "../../hook/useFetch";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false)

  params.id;

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = () => {

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} 
          onRefresh={onRefresh}
          />}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
          ) : error ? (
            <Text>Algo deu Errado</Text>
          ): data.length === 0 ? (
            <Text>Sem informações</Text>
          ) : (
            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company 
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
              
              />


            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
