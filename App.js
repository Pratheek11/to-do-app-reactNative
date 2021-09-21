import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  // we create three states each for dark mode, user input and task list
  const [t, setT] = useState();
  const [tasksItems, setTasksItems] = useState([]);
  const [dark, setDark] = useState(false);
  // handleTask function is used to handle the user input to add to to-do list and clearing the input space
  const handelTask = () => {
    Keyboard.dismiss();
    setTasksItems([...tasksItems, t]);
    setT(null);
  };
  // handleComplete function is used to pass to its child component to handle the task complete event
  // when user completes the task the particular task is removed from the list.
  const handelCompletedTask = (index) => {
    let taskTemp = [...tasksItems];
    taskTemp.splice(index, 1);
    setTasksItems(taskTemp);
  };

  return (
    // taking  dark mode enabled as state ,
    // accessing it we enable backgroundColor and text color according to
    // user prefered mode
    <View
      style={[styles.container, { backgroundColor: dark ? "#000" : "#e8eaed" }]}
    >
      <StatusBar style="auto" />
      <View style={styles.wrapper}>
        <Text style={[styles.header, { color: dark ? "#fff" : "#000" }]}>
          Today's task 💪
        </Text>
        <TouchableOpacity onPress={() => setDark(!dark)} style={styles.changer}>
          <Text style={[{ color: dark ? "#fff" : "#000" }]}>
            {dark ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
        {/* this section is used to render items and we use scrollview to make scrollable
         list if it more than screen size. */}
        <View style={styles.items}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* As we store our data in state in form of array of objects we can use map method do use single item to 
            render by passing it as props to a component. */}
            {tasksItems.map((item, index) => {
              return (
                <Task
                  text={item}
                  key={index}
                  index={index}
                  dark={dark}
                  handelCompletedTask={handelCompletedTask}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      {/* The keybordAvoidingView is used as , while user in giving input it pushes the
             input layout up so that components do no tget climsy */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeSection}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={t}
          onChangeText={(text) => setT(text)}
        />
        <TouchableOpacity onPress={() => handelTask()}>
          <View style={styles.addBtn}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
// we use inline stylesheet for css to style our tags,items,etc
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  wrapper: {
    paddingTop: 60,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  changer: {
    position: "absolute",
    right: 10,
    top: 70,
  },
  items: {
    marginTop: 15,
    marginBottom: 50,
  },
  writeSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: 250,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addBtn: {
    alignItems: "center",
    width: 40,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 70,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
});
// const Container = styled.View`
// flex: 1,
// backgroundColor: "#fff",
// alignItems: "center",
// justifyContent: "center",

// `;
