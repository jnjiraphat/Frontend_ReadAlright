import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Tabs } from "@ant-design/react-native";

export default class BasicTabsExample extends React.Component {
  render() {
    const tabs = [{ title: "Reading" }, { title: "Vocabulary" }];
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          tabs={tabs}
          renderUnderline={() => null}
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 0,
            },
          }}
          renderTabBar={(tabProps) => (
            <View
              style={{
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 4,
                  borderColor: "#000",
                  width: 237,
                  height: 32,
                }}
              >
                {tabProps.tabs.map((tab, i) => (
                  // change the style to fit your needs
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={tab.key || i}
                    style={{
                      // width: "10%",
                      padding: 6,
                      width: "50%",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      const { goToTab, onTabClick } = tabProps;
                      // tslint:disable-next-line:no-unused-expression
                      onTabClick && onTabClick(tabs[i], i);
                      // tslint:disable-next-line:no-unused-expression
                      goToTab && goToTab(i);
                    }}
                  >
                    <Text
                      style={{
                        color: tabProps.activeTab === i ? "green" : undefined,
                      }}
                    >
                      {tab.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        >
          <View style={styles.content}>
            <Text>Content of Reading</Text>
          </View>
          <View style={styles.content}>
            <Text>Content of Vocabulary</Text>
          </View>
        </Tabs>
      </View>
    );
  }
}
export const title = "Tabs";
export const description = "Tabs example";

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#fff",
  },
});
