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

const tabs = ["Sobre", "Qualificações", "Responsabilidades"];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  params.id;

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = () => {};

  const displayTabContext = () => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <JobAbout info={data[0].job_description ?? ["Sem informações"]} />
        );
      case tabs[1]:
        return (
          <Specifics
            title="Qualificações"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case tabs[2]:
        return (
          <Specifics
            title="Responsabilidades"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Algo deu Errado</Text>
          ) : data.length === 0 ? (
            <Text>Sem informações</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContext()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
