import { View } from "react-native";
import remoteConfig from "@react-native-firebase/remote-config";

import { styles } from "./styles";

import { Button } from "../../components/Button";
import { Banner } from "../../components/Banner";
import { Lines } from "../../components/Lines";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

const DATA = Array.from({ length: 6 }, (_, i) => i);

export function Home() {
  const [showBannerFlag, setShowBannerFlag] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("");

  async function fetchRemoteConfig() {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 3000,
    });

    await remoteConfig().setDefaults({
      show_banner_flag: false,
    });

    await remoteConfig().fetchAndActivate();

    const { show_banner_flag, button_title } = remoteConfig().getAll();

    setShowBannerFlag(show_banner_flag.asBoolean());
    setButtonTitle(button_title.asString());
  }

  useEffect(() => {
    fetchRemoteConfig();
  }, []);

  return (
    <View style={styles.container}>
      {showBannerFlag && <Banner />}

      <View style={styles.content}>
        <Lines />

        <View style={styles.items}>
          {DATA.map((item) => (
            <Card key={item} />
          ))}
        </View>

        <Button title={buttonTitle} />
      </View>
    </View>
  );
}
