import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (width - 32) / 2,
    marginBottom: 16,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footer: {
    marginVertical: 20,
  },
  endContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  endLine: {
    width: 100,
    height: 2,
    borderRadius: 1,
    marginBottom: 8,
  },
  endText: {
    fontSize: 14,
  },
  refreshContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  categoriesSkeleton: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  categorySkeleton: {
    width: 80,
    height: 36,
    borderRadius: 20,
    marginRight: 8,
    opacity: 0.3,
  },
});
