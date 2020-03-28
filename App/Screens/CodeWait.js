<ScrollView>
  <Grid>
    <Row>
      <View style={styles.container}>
        <Text style={styles.labelText}>Payment:</Text>
        <TagSelect
          data={data}
          max={3}
          ref={tag => {
            this.tag = tag;
          }}
          onMaxError={() => {
            Alert.alert("Ops", "Max reached");
          }}
          style={}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Button
              title="Get selected count"
              style={styles.button}
              onPress={() => {
                Alert.alert("Selected count"`Total: ${this.tag.totalSelected}`);
              }}
            />
          </View>
          <View>
            <Button
              title="Get selected"
              onPress={() => {
                Alert.alert(
                  "Selected items:",
                  JSON.stringify(this.tag.itemsSelected)
                );
              }}
            />
          </View>
        </View>
      </View>
    </Row>
    {/* test */}

    <Row>
      <TouchableOpacity style={{ margin: 50 }} onPress={goToAbout}>
        <Text>Click to go to about</Text>
      </TouchableOpacity>
    </Row>
    <Row>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.topic}>Interest</Text>
          <Text style={styles.descript}>
            Please select 3 that you interests
          </Text>
        </View>
      </View>
    </Row>
    <Row>
      <View style={styles.container}></View>
    </Row>

    {/* Render CatagoryName */}
    <FlatGrid
      itemDimension={110}
      items={result}
      style={styles.gridView}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPressIn={() => setCategoryId(item.category_id)}
          onPress={onCollect}
        >
          <Card
            containerStyle={[
              styles.itemContainer,
              {
                backgroundColor: selected ? "#6e3b6e" : "#ffffff"
              }
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.itemTopic}>{item.categoryName}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      )}
      extraData={selected}
    />
    <Row style={styles.container}>
      <Button
        title="Next"
        buttonStyle={styles.button}
        onPress={goToAbout}
      ></Button>
    </Row>
  </Grid>
</ScrollView>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  gridView: {
    marginTop: 20,
    flex: 1
  },
  itemContainer: {
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden",
    backgroundColor: "#f9c2ff"
  },
  topic: {
    fontSize: 20,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold"
  },
  descript: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600"
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold"
  },
  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    padding: 15
  },
  buttonInner: {
    marginBottom: 15
  },
  labelText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 15
  },
  item: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#FFF"
  },
  label: {
    color: "#333"
  },
  itemSelected: {
    backgroundColor: "#333"
  },
  labelSelected: {
    color: "#FFF"
  }
});
