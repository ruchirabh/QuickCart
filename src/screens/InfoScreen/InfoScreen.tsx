import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { createStyles } from '../../styles/InfoScreen/InfoScreen.styles';

const { width } = Dimensions.get('window');

const InfoScreen = () => {
  const navigation = useNavigation();
  const { theme, isDark } = useAppTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <View style={styles.backBtnInner}>
            <Icon name="arrow-back" size={22} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Center Brand Title */}
        <View style={styles.titleContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.titleQuick}>Quick</Text>
            <View style={styles.iconWrap}>
              <Icon name="cart" size={22} color={theme.colors.primary} />
            </View>
            <Text style={styles.titleCart}>Cart</Text>
          </View>
          <Text style={styles.subHeader}>App Information</Text>
        </View>

        {/* Right spacer with share icon */}
        {/* <TouchableOpacity style={styles.rightSpacer} activeOpacity={0.7}>
          <Icon name="share-social-outline" size={22} color={theme.colors.textSecondary} />
        </TouchableOpacity> */}
      </View>

      {/* ---------- Content ---------- */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.primary + '20' },
            ]}
          >
            <Icon name="information" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.heroTitle}>QuickCart</Text>
          <Text style={styles.heroSubtitle}>Version 1.0.0</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: theme.colors.primary + '15' },
            ]}
          >
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>
              React Native Demo App
            </Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon
              name="information-circle-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.cardTitle}>About the App</Text>
          </View>
          <Text style={styles.cardText}>
            QuickCart is a modern shopping application built with React Native.
            It demonstrates best practices in mobile development with a clean,
            scalable architecture and beautiful UI.
          </Text>
        </View>

        {/* Features Grid */}
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.featuresGrid}>
          <View
            style={[styles.featureItem, { backgroundColor: theme.colors.card }]}
          >
            <View
              style={[styles.featureIcon, { backgroundColor: '#4F6FBF20' }]}
            >
              <Icon name="cart" size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Shopping Cart</Text>
            <Text style={styles.featureDesc}>
              Add, remove, and manage items
            </Text>
          </View>

          <View
            style={[styles.featureItem, { backgroundColor: theme.colors.card }]}
          >
            <View
              style={[styles.featureIcon, { backgroundColor: '#FFB80020' }]}
            >
              <Icon name="infinite" size={24} color="#FFB800" />
            </View>
            <Text style={styles.featureTitle}>Infinite Scroll</Text>
            <Text style={styles.featureDesc}>Paginated product loading</Text>
          </View>

          <View
            style={[styles.featureItem, { backgroundColor: theme.colors.card }]}
          >
            <View
              style={[styles.featureIcon, { backgroundColor: '#34C75920' }]}
            >
              <Icon name="color-palette" size={24} color="#34C759" />
            </View>
            <Text style={styles.featureTitle}>Dark Mode</Text>
            <Text style={styles.featureDesc}>Automatic theme switching</Text>
          </View>

          <View
            style={[styles.featureItem, { backgroundColor: theme.colors.card }]}
          >
            <View
              style={[styles.featureIcon, { backgroundColor: '#FF3B3020' }]}
            >
              <Icon name="flash" size={24} color="#FF3B30" />
            </View>
            <Text style={styles.featureTitle}>Skeleton Loaders</Text>
            <Text style={styles.featureDesc}>Smooth loading states</Text>
          </View>
        </View>

        {/* Tech Stack */}
        <Text style={styles.sectionTitle}>Technology Stack</Text>
        <View style={styles.techStack}>
          <View style={styles.techRow}>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon name="logo-react" size={16} color="#61DAFB" />
              <Text style={styles.techText}>React Native</Text>
            </View>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon2 name="language-typescript" size={16} color="#3178C6" />
              <Text style={styles.techText}>TypeScript</Text>
            </View>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon3 name="redux" size={16} color="#764ABC" />
              <Text style={styles.techText}>Redux Toolkit</Text>
            </View>
          </View>
          <View style={styles.techRow}>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon name="git-network" size={16} color="#F05032" />
              <Text style={styles.techText}>Axios</Text>
            </View>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon name="apps" size={16} color={theme.colors.primary} />
              <Text style={styles.techText}>DummyJSON</Text>
            </View>
            <View
              style={[styles.techChip, { backgroundColor: theme.colors.card }]}
            >
              <Icon name="navigate" size={16} color="#8B5CF6" />
              <Text style={styles.techText}>React Navigation</Text>
            </View>
          </View>
        </View>

        {/* API Information */}
        <Text style={styles.sectionTitle}>API Integration</Text>
        <View style={styles.apiCard}>
          <View style={styles.apiHeader}>
            <Icon name="cloud-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.apiTitle}>DummyJSON API</Text>
          </View>
          <Text style={styles.apiUrl}>https://dummyjson.com/products</Text>
          <View style={styles.apiBadge}>
            <Text style={styles.apiBadgeText}>REST API</Text>
            <Text style={styles.apiBadgeText}>Pagination</Text>
            <Text style={styles.apiBadgeText}>Categories</Text>
          </View>
        </View>

        {/* Developer Info */}
        <View style={styles.developerCard}>
          <Icon name="code-slash" size={24} color={theme.colors.primary} />
          <Text style={styles.developerText}>
            Developed with ❤️ using React Native
          </Text>
          <Text style={styles.developerSubtext}>
            © 2025 QuickCart. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
