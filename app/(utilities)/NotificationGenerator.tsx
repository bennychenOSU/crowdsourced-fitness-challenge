import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Provider as PaperProvider } from 'react-native-paper';

type NotificationContextType = {
  showNotification: (message: string, duration?: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [duration, setDuration] = useState<number>(3000);

  const showNotification = (msg: string, dur: number = 3000) => {
    setMessage(msg);
    setDuration(dur);
    setVisible(true);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <PaperProvider>
        {children}
        <Snackbar
          visible={visible}
          duration={duration}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'OK',
            onPress: () => setVisible(false),
          }}
        >
          {message}
        </Snackbar>
      </PaperProvider>
    </NotificationContext.Provider>
  );
};
