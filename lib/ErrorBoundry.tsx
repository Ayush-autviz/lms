import React, { useState } from "react";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// export default class ErrorBoundary extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // You can also log the error to an error reporting service here
//     console.log(error, errorInfo);
//   }

//   render() {
//     const navigation = useNavigation();
//     if (this.state.hasError) {
//       // console.log("errorBoudaryError");
//       // // You can render any custom fallback UI
//       // Alert.alert("Something went Error...", undefined, [
//       //   {
//       //     text: "Ok",
//       //     onPress: () => navigation.goBack(),
//       //     style: "default",
//       //   },
//       // ]);
//     }

//     return this.props.children;
//   }
// }

interface Props {
  children: React.ReactNode;
}

// export default function ErrorBoundary(props: Props) {
//   const [hasError, setHasError] = useState(false);

//   function handleCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // You can also log the error to an error reporting service here
//     console.log(error, errorInfo);
//     setHasError(true);
//   }

//   if (hasError) {
//     // You can render any custom fallback UI
//     return <Text>Something went wrong.</Text>;
//   }

//   return (
//     <React.Fragment>
//       {React.Children.map(props.children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, { onError: handleCatch });
//         }
//         return child;
//       })}
//     </React.Fragment>
//   );
// }
