/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/authUtils';
import { apiLogout } from '../apis/auth/access.api';
import { apiGetAllPostTypes } from '../apis/user/postType.api';
import { apiGetAllMyInboxes } from '../apis/user/manager/inbox.api';
import instance from '../apis/http.api';

const getInitialAppContext = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  handleLogout: () => null,
  addressData: [],
  setAddressData: () => null,
  postTypes: [],
  setPostTypes: () => null,
  socket: null,
  setSocket: () => null,
  usersOnline: [],
  setUsersOnline: () => null,
  myInboxes: [],
  setMyInboxes: () => null,
  isLoadingInboxes: false,
  seIsLoadingInboxes: () => false,
  currentPrivateChat: {},
  setCurrentPrivateChat: () => null,
  isLoadingPrivateChat: false,
  setIsLoadingPrivateChat: () => false,
  isOpenPrivateChat: false,
  setIsOpenPrivateChat: () => false,
  unreadCounts: 0,
  setUnreadCounts: () => 0,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultValue.isAuthenticated
  );
  const [profile, setProfile] = useState(defaultValue.profile);
  const [addressData, setAddressData] = useState(defaultValue.addressData);
  const [postTypes, setPostTypes] = useState(defaultValue.postTypes);
  const [socket, setSocket] = useState(defaultValue.socket);
  const [usersOnline, setUsersOnline] = useState(defaultValue.usersOnline);
  const [myInboxes, setMyInboxes] = useState(defaultValue.myInboxes);
  const [currentPrivateChat, setCurrentPrivateChat] = useState(
    defaultValue.currentPrivateChat
  );
  const [isLoadingPrivateChat, setIsLoadingPrivateChat] = useState(
    defaultValue.isLoadingPrivateChat
  );

  const [isOpenPrivateChat, setIsOpenPrivateChat] = useState(
    defaultValue.isOpenPrivateChat
  );
  const [unreadCounts, setUnreadCounts] = useState(defaultValue.unreadCounts);
  const reset = useCallback(() => {
    setIsAuthenticated(false);
    setProfile(null);
    setMyInboxes([]);
    setCurrentPrivateChat({});
    setUsersOnline([]);
    setSocket(null);
    setUnreadCounts(0);
  }, []);

  const handleLogout = async () => {
    const response = await apiLogout();
    if (response.status === 200) {
      reset();
    }
  };

  const fetchPostTypes = async () => {
    const response = await apiGetAllPostTypes();
    if (response.status === 200) {
      setPostTypes(response.data);
    }
  };

  const fetchAddressData = async () => {
    const result = await axios.get(
      'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
    );
    if (result.status === 200) {
      setAddressData(result.data);
    }
  };

  const fetchMyInboxes = useCallback(async () => {
    if (profile) {
      const result = await apiGetAllMyInboxes();
      if (result.status === 200) {
        setMyInboxes(result.data);
      }
    }
  }, [profile]);

  useEffect(() => {
    fetchAddressData();
  }, []);

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          reset();
        }
        return Promise.reject(error);
      }
    );
  }, [reset]);

  useEffect(() => {
    fetchPostTypes();
  }, []);

  useEffect(() => {
    fetchMyInboxes();
  }, [fetchMyInboxes]);

  useEffect(() => {
    let socket;
    if (profile) {
      socket = io('http://localhost:3000');
      setSocket(socket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [profile]);

  useEffect(() => {
    if (!socket || !profile) return;
    socket.emit('online', profile.id);

    const handleUsersOnline = (data) => {
      setUsersOnline(data);
    };
    const handleUnreadInboxCount = (data) => {
      setUnreadCounts(data);
    };

    const handleCurrentPrivateChat = (data) => {
      setCurrentPrivateChat(data);
      setMyInboxes((prev) => {
        const updatedInboxes = prev.filter(
          (inbox) => inbox.id !== data.inboxDetail.id
        );
        return [data.inboxDetail, ...updatedInboxes];
      });
    };

    socket.on('users-online', handleUsersOnline);
    socket.on('unread-inbox-counts', handleUnreadInboxCount);
    socket.on('current-private-chat', handleCurrentPrivateChat);

    return () => {
      socket.off('users-online', handleUsersOnline);
      socket.off('unread-inbox-counts', handleUnreadInboxCount);
      socket.off('current-private-chat', handleCurrentPrivateChat);
    };
  }, [profile, socket]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        handleLogout,
        addressData,
        postTypes,
        myInboxes,
        setMyInboxes,
        setCurrentPrivateChat,
        currentPrivateChat,
        setIsLoadingPrivateChat,
        isLoadingPrivateChat,
        usersOnline,
        socket,
        isOpenPrivateChat,
        setIsOpenPrivateChat,
        unreadCounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
