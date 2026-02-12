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
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';

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
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '20' }]}>
            <Icon name="information" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.heroTitle}>QuickCart</Text>
          <Text style={styles.heroSubtitle}>Version 1.0.0</Text>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '15' }]}>
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>
              React Native Demo App
            </Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="information-circle-outline" size={24} color={theme.colors.primary} />
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
          <View style={[styles.featureItem, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.featureIcon, { backgroundColor: '#4F6FBF20' }]}>
              <Icon name="cart" size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Shopping Cart</Text>
            <Text style={styles.featureDesc}>Add, remove, and manage items</Text>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.featureIcon, { backgroundColor: '#FFB80020' }]}>
              <Icon name="infinite" size={24} color="#FFB800" />
            </View>
            <Text style={styles.featureTitle}>Infinite Scroll</Text>
            <Text style={styles.featureDesc}>Paginated product loading</Text>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.featureIcon, { backgroundColor: '#34C75920' }]}>
              <Icon name="color-palette" size={24} color="#34C759" />
            </View>
            <Text style={styles.featureTitle}>Dark Mode</Text>
            <Text style={styles.featureDesc}>Automatic theme switching</Text>
          </View>

          <View style={[styles.featureItem, { backgroundColor: theme.colors.card }]}>
            <View style={[styles.featureIcon, { backgroundColor: '#FF3B3020' }]}>
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
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
              <Icon name="logo-react" size={16} color="#61DAFB" />
              <Text style={styles.techText}>React Native</Text>
            </View>
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
              <Icon name="logo-typescript" size={16} color="#3178C6" />
              <Text style={styles.techText}>TypeScript</Text>
            </View>
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
              <Icon name="redux-logo" size={16} color="#764ABC" />
              <Text style={styles.techText}>Redux Toolkit</Text>
            </View>
          </View>
          <View style={styles.techRow}>
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
              <Icon name="git-network" size={16} color="#F05032" />
              <Text style={styles.techText}>Axios</Text>
            </View>
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
              <Icon name="apps" size={16} color={theme.colors.primary} />
              <Text style={styles.techText}>DummyJSON</Text>
            </View>
            <View style={[styles.techChip, { backgroundColor: theme.colors.card }]}>
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
          <Text style={styles.developerText}>Developed with ❤️ using React Native</Text>
          <Text style={styles.developerSubtext}>© 2025 QuickCart. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* ---------- Header ---------- */
    header: {
      flexDirection: 'row',
      alignItems: 'center',
     
      paddingTop: Platform.OS === 'android' 
        ? (StatusBar.currentHeight || 0) + 4 
        : 0,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 5,
      minHeight: Platform.OS === 'ios' ? 100 : 96,
    },

    backBtn: {
      padding: 4,
    },

    backBtnInner: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
    },

    rightSpacer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.textSecondary + '10',
      justifyContent: 'center',
      alignItems: 'center',
    },

    /* ---------- Brand Title ---------- */
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:80
    },

    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconWrap: {
      marginHorizontal: 4,
      marginTop: 2,
    },

    titleQuick: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },

    titleCart: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.primary,
      letterSpacing: 0.5,
    },

    subHeader: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
      letterSpacing: 0.3,
    },

    /* ---------- Content ---------- */
    content: {
      padding: 20,
      paddingBottom: 40,
    },

    /* Hero Section */
    heroSection: {
      alignItems: 'center',
      marginBottom: 24,
      marginTop: 8,
    },

    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    heroTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: 4,
    },

    heroSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },

    badge: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: '600',
    },

    /* Cards */
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 3,
    },

    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginLeft: 8,
    },

    cardText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textSecondary,
    },

    /* Features Grid */
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 16,
      marginTop: 8,
    },

    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },

    featureItem: {
      width: (width - 48) / 2,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    featureIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },

    featureDesc: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },

    /* Tech Stack */
    techStack: {
      marginBottom: 24,
    },

    techRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },

    techChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    techText: {
      fontSize: 12,
      color: theme.colors.text,
      marginLeft: 6,
      fontWeight: '500',
    },

    /* API Card */
    apiCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    apiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    apiTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginLeft: 8,
    },

    apiUrl: {
      fontSize: 12,
      color: theme.colors.primary,
      marginBottom: 12,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },

    apiBadge: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    apiBadgeText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.border + '40',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      overflow: 'hidden',
    },

    /* Developer Card */
    developerCard: {
      alignItems: 'center',
      paddingVertical: 24,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },

    developerText: {
      fontSize: 14,
      color: theme.colors.text,
      marginTop: 12,
      marginBottom: 4,
    },

    developerSubtext: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });