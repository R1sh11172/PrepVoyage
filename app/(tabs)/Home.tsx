import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';


export default function HomeScreen({ navigation }) {
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 const [showStartPicker, setShowStartPicker] = useState(false);
 const [showEndPicker, setShowEndPicker] = useState(false);
 const [numPeople, setNumPeople] = useState('');
 const [location, setLocation] = useState('');


 const formatDate = (date) => date.toLocaleDateString('en-CA');


 const onChangeDate = (setDate, setShowPicker) => (event, selectedDate) => {
   setShowPicker(false);
   if (selectedDate) {
     setDate(formatDate(selectedDate));
   }
 };


 return (
   <ScrollView style={styles.scrollContainer}>
     <Text style={styles.title}>PrepVoyage ✈️</Text>


     <View style={styles.section}>
       <Text style={styles.subtitle}>Travel Details</Text>


       {/* Start Date */}
       <Text style={styles.label}>Start Date:</Text>
       <View style={styles.inputContainer}>
         <TextInput style={styles.dateTextInput} placeholder="YYYY-MM-DD" placeholderTextColor="#666" value={startDate} editable={false} />
         <TouchableOpacity onPress={() => setShowStartPicker(true)}>
           <FontAwesome name="calendar" size={24} color="#000" />
         </TouchableOpacity>
       </View>
       {showStartPicker && (
         <DateTimePicker value={startDate ? new Date(startDate) : new Date()} mode="date" display="default" onChange={onChangeDate(setStartDate, setShowStartPicker)} />
       )}


       {/* End Date */}
       <Text style={styles.label}>End Date:</Text>
       <View style={styles.inputContainer}>
         <TextInput style={styles.dateTextInput} placeholder="YYYY-MM-DD" placeholderTextColor="#666" value={endDate} editable={false} />
         <TouchableOpacity onPress={() => setShowEndPicker(true)}>
           <FontAwesome name="calendar" size={24} color="#000" />
         </TouchableOpacity>
       </View>
       {showEndPicker && (
         <DateTimePicker value={endDate ? new Date(endDate) : new Date()} mode="date" display="default" onChange={onChangeDate(setEndDate, setShowEndPicker)} />
       )}


       {/* Number of People */}
       <Text style={styles.label}>Number of Travelers:</Text>
       <TextInput style={styles.textInput} placeholder="Enter number of travelers" placeholderTextColor="#666" keyboardType="numeric" value={numPeople} onChangeText={setNumPeople} />


       {/* Location */}
       <Text style={styles.label}>Trip Location:</Text>
       <TextInput style={styles.textInput} placeholder="Enter trip destination" placeholderTextColor="#666" value={location} onChangeText={setLocation} />
     </View>


     {/* NEXT Button */}
     <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('PackingList')}>
       <Text style={styles.nextButtonText}>Next</Text>
     </TouchableOpacity>
   </ScrollView>
 );
}


const styles = StyleSheet.create({
 scrollContainer: {
   flex: 1,
   padding: 20,
   backgroundColor: '#FFFFFF',
 },
 title: {
   fontSize: 45,
   fontWeight: 'bold',
   marginVertical: 20,
   textAlign: 'center',
   color: '#00796B',
   textTransform: 'uppercase',
 },
 section: {
   marginTop: 20,
   padding: 15,
   backgroundColor: '#f8f9fa',
   borderRadius: 10,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 3,
 },
 subtitle: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 10,
   textAlign: 'center',
 },
 label: {
   fontSize: 16,
   fontWeight: '600',
   marginTop: 10,
 },
 inputContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   borderWidth: 1,
   borderColor: '#4DB6AC',
   paddingHorizontal: 10,
   borderRadius: 8,
   marginTop: 5,
   backgroundColor: '#fff',
 },
 dateTextInput: {
   flex: 1,
   padding: 10,
   color: '#000',
 },
 textInput: {
   flex: 1,
   padding: 10,
   color: '#000',
   borderWidth: 1,
   borderColor: '#4DB6AC',
   borderRadius: 8,
   marginTop: 5,
   backgroundColor: '#fff',
 },
 nextButton: {
   backgroundColor: '#009688',
   padding: 15,
   borderRadius: 8,
   alignItems: 'center',
   marginVertical: 20,
 },
 nextButtonText: {
   color: '#fff',
   fontSize: 18,
   fontWeight: 'bold',
 },
});