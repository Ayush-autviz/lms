import { StatusBar, StatusBarProps, useColorScheme } from "react-native";
import React from "react";

interface StatusBarCustomProps extends StatusBarProps {
}

const StatusBarCustom: React.FC<StatusBarCustomProps> = ({
  backgroundColor,
  ...props
}) => {
  const colorScheme = useColorScheme();
  return (
    <StatusBar
      backgroundColor={colorScheme == "dark" ? "#000000" : "#FFFFFF"}
      {...props}
    />
  );
};

export default StatusBarCustom;
