import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Task = (props) => {
  // we access the text to be rendered , dark mode, and task completion function throught the props and using it
  // in the component makes it resuable
  return (
    // taking  dark mode enabled as state , and obtained through props
    // accessing it we enable backgroundColor and text color according to
    // user prefered mode
    <View
      style={[
        styles.container,
        { backgroundColor: props.dark ? "#808080" : "#fff" },
      ]}
    >
      <View style={styles.itemsleft}>
        <View style={styles.square}></View>
        <Text style={styles.header}>{props.text}</Text>
      </View>
      {/* we pass index to the complete task function as to make a particular task remove from the list as
      it has been completed. */}
      <TouchableOpacity
        onPress={() => props.handelCompletedTask(props.index)}
        style={styles.circular}
      ></TouchableOpacity>
    </View>
  );
};
// we use inline stylesheet for css to style our tags,items,etc
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 5,
  },
  itemsleft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 30,
    height: 30,
    backgroundColor: "#55bcf6",
    borderRadius: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 14,
    maxWidth: "80%",
  },
  circular: {
    borderColor: "#55bcf6",
    borderRadius: 5,
    width: 12,
    height: 12,
    borderWidth: 2,
  },
});
export default Task;
