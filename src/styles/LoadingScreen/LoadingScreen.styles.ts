import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createLoadingStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  backgroundContainer: {
    position: 'absolute',
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#0F2792',
    opacity: isDark ? 0.15 : 0.05,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#FFB800',
    opacity: isDark ? 0.15 : 0.05,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 24,
    shadowColor: '#0F2792',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.4 : 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: isDark ? '#4F6FBF' : '#0F2792',
    letterSpacing: 1,
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotBlue: {
    backgroundColor: isDark ? '#4F6FBF' : '#0F2792',
  },
  dotYellow: {
    backgroundColor: '#FFB800',
  },
  loadingText: {
    fontSize: 14,
    color: isDark ? '#D1D5DB' : '#6B7280',
    fontWeight: '500',
  },
});