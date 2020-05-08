import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Tabs } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";

const SwitchType = (props) => {
  const { tabs, ContentDefault, ContentChange, SwitchDisplay } = props;
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
              // justifyContent: "center",
              display: SwitchDisplay,
              // left: 50, //ลองtestกับ device อื่นๆว่ามันกลางจริงมั้ย
              // position: "absolute",
              // zIndex: 1,
            }}
          >
            <LinearGradient
              colors={["#7EF192", "#2DC897"]}
              style={styles.LayoutGradient}
            >
              <View
                style={{
                  paddingHorizontal: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#E5E5E5",
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
                      backgroundColor:
                        tabProps.activeTab === i ? "transparent" : "#fff",
                      shadowOffset: {
                        width: 0,
                        height: tabProps.activeTab === i ? 0 : 4,
                      },
                      shadowRadius: tabProps.activeTab === i ? 0 : 4.65,
                      shadowColor:
                        tabProps.activeTab === i ? "transparent" : "#000",
                      shadowOpacity: tabProps.activeTab === i ? 0 : 0.3,
                      elevation: tabProps.activeTab === i ? 0 : 8,
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
                        fontFamily: "PT-Bold",
                        color:
                          tabProps.activeTab === i
                            ? "#000"
                            : "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {tab.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </View>
        )}
      >
        <ScrollView
          style={{
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.content}>{ContentDefault}</View>
        </ScrollView>
        <ScrollView>
          <View style={styles.content}>{ContentChange}</View>
        </ScrollView>
      </Tabs>
    </View>
  );
};
export default SwitchType;

const styles = StyleSheet.create({
  content: {
    // alignItems: "center",
    // justifyContent: "center",
    // height: Dimensions.get("window").height,
    // backgroundColor: "#000",
    marginTop: "5%",
  },
  LayoutGradient: {
    borderRadius: 25,
    height: 65,
    width: 299,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
  },
});
