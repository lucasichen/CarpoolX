import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';

const DropdownMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setVisible(false);
  }

  return (
    //<Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              {selectedOption}
            </Button>
          }
        >
          <Menu.Item onPress={() => handleOptionSelect('Option 1')} title="Option 1" />
          <Menu.Item onPress={() => handleOptionSelect('Option 2')} title="Option 2" />
          <Menu.Item onPress={() => handleOptionSelect('Option 3')} title="Option 3" />
        </Menu>
      </View>
    //</Provider>
  );
};

export default DropdownMenu;
