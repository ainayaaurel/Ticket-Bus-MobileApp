import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconBus from 'react-native-vector-icons/FontAwesome5';
import PickerModal from 'react-native-picker-modal-view';
import {Card, Header, PricingCard} from 'react-native-elements';
import Icondots from 'react-native-vector-icons/MaterialCommunityIcons';
import {isLogin} from '../Redux/Actions/Auth/AuthLogin';
import {getRoutes} from '../Redux/Actions/ActionsRoutes';
import {getMyAccount} from '../Redux/Actions/ActionsProfil';
import {connect} from 'react-redux';

const {width: WIDTH} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.props.getRoutes();

    this.changeScreenToBus = async () => {
      await this.props.navigation.navigate('Select Bus', {
        data: {
          departure: this.state.selectedItems.Value,
          date: this.state.date.dateString,
        },
      });
    };

    this.changeScreenToCalendar = () => {
      this.props.navigation.navigate('Calender', {
        selectdate: (date) => this.updateDate(date),
      });
    };
  }
  state = {
    search: '',
    selectedItems: {},
    date: {},
  };
  updateSearch = (search) => {
    this.setState({search});
  };
  selected = (selectedItems) => {
    this.setState({selectedItems});

    console.log('selected', selectedItems);
  };

  updateDate = (date) => {
    this.setState({date});
    // console.log(date)
  };
  componentDidMount() {
    this.props.getMyAccount();
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View>
        <Header
          containerStyle={{backgroundColor: '#15B105', marginTop: -30}}
          centerComponent={{
            text: 'Ticket.Bus',
            fontWeight: 'bold',
            style: {color: '#fff'},
          }}
          leftComponent={<IconBus name="bus" color="#fff" size={30} />}
        />
        <View>
          <Card>
            <Text>
              {' '}
              Hai{' '}
              {this.props.myprofile.usersdetails &&
                this.props.myprofile.usersdetails.name}{' '}
              Your Balance!
            </Text>
            <Text style={{width: '50%'}}>
              {' '}
              Balance : Rp{' '}
              {this.props.myprofile.usersdetails &&
                this.props.myprofile.usersdetails.balance}
            </Text>
          </Card>
        </View>

        <Card>
          <Text style={{marginBottom: 10}}>Departure - Arrival</Text>
          {this.props.routes && (
            <PickerModal
              value={this.state.selectedItems}
              onSelected={(selected) => this.selected(selected)}
              onRequestClosed={() => console.warn('closed...')}
              onBackRequest={() => console.warn('back key pressed')}
              items={this.props.routes}
              sortingLanguage={'tr'}
              showToTopButton={true}
              defaultSelected={this.state.selectedItem}
              autoCorrect={false}
              autoGenerateAlphabet={true}
              chooseText={'Select departure - arrival'}
              searchText={'Search...'}
              forceSelect={false}
              autoSort={true}
            />
          )}
          <Text style={{marginBottom: 10, fontSize: 18}}>Date</Text>
          <TouchableOpacity onPress={this.changeScreenToCalendar}>
            <Text>Date Pick</Text>
            <Text>
              {this.state.date.dateString && this.state.date.dateString}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSearch}>
            <Text
              style={styles.textSearch}
              onPress={() =>
                this.props.navigation.navigate('Select Bus', {
                  data: {
                    departure: this.state.selectedItems.Value,
                    date: this.state.date.dateString,
                  },
                })
              }>
              SEARCH
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#15B105',
    justifyContent: 'center',
    paddingLeft: 25,
    height: 50,
  },
  btnSearch: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: '#42A845',
    justifyContent: 'center',
    marginTop: 20,
  },
  textSearch: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: WIDTH - 50,
    height: 60,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: 'rgb(255,255,255)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    shadowOpacity: 0.7,
    borderColor: '#fff',
    color: '#000',
  },
  inputContainer: {
    position: 'relative',
    marginTop: 10,
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  routes: state.routes.routes,
  login: state.login.sudahlogin,
  myprofile: state.account,
});

export default connect(mapStateToProps, {getRoutes, getMyAccount, isLogin})(
  HomeScreen,
);

{
  /* <View style={styles.header}>
          <IconBus name='bus-side' size={50} color='#fff' />
        </View> */
}
// {/* <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input} placeholder='Your name'
//           />
//           <TextInput
//             style={styles.input} placeholder='Your name'
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <TextInput style={styles.input} placeholder='Tanggal Perjalanan' />
//         </View>
//         <TouchableOpacity style={styles.btnSignUp}>
//           <Text style={styles.textSignUp}>Search</Text>
//         </TouchableOpacity> */}

//         // <PickerModal
//         //   onSelected={this.selected}
//         //   value={this.state.selectedItems}
//         //   onSelected={(selected) => this.selected(selected)}
//         //   onRequestClosed={() => console.warn('closed...')}
//         //   onBackRequest={() => console.warn('back key pressed')}
//         //   items={list}
//         //   sortingLanguage={'tr'}
//         //   showToTopButton={true}
//         //   defaultSelected={this.state.selectedItem}
//         //   autoCorrect={false}
//         //   autoGenerateAlphabet={true}
//         //   chooseText={'Choose one'}
//         //   searchText={'Search...'}
//         //   forceSelect={false}
//         //   autoSort={true}
//         // />

//         // <SearchBar
//         //   containerStyle={{ backgroundColor: '#fff' }}
//         //   inputStyle={{ backgroundColor: '#fff' }}
//         //   inputContainerStyle={{ backgroundColor: 'grey', borderRadius: 0 }}
//         //   placeholder="Type your destination"
//         //   onChangeText={this.updateSearch}
//         //   value={this.state.search}
//         // />

// import React, { Component } from 'react'
// import { Text } from 'react-native'

// export default class HomeScreen extends Component {
//   render() {
//     return (
//       <Text>Hola</Text>
//     )
//   }
// }
