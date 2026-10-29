"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { demoDiscountCodes, defaultDeliveryConfig } from "@/lib/config";
import { products as seedProducts } from "@/lib/data/products";
import { storageKeys } from "@/lib/mock/storage";
import { usePersisted } from "@/lib/mock/use-persisted";
import type {
  Address,
  AppointmentRequest,
  DeliveryConfig,
  DiscountCode,
  MeasurementSet,
  Order,
  Product,
  TailoringRequest,
} from "@/lib/types";

const emptyOrders: Order[] = [];
const emptyTailoring: TailoringRequest[] = [];
const emptyAppointments: AppointmentRequest[] = [];
const emptyMeasurements: MeasurementSet[] = [];
const emptyAddresses: Address[] = [];
const emptyProducts: Product[] = [];
const emptyFeatured: string[] = [];

type RecordsContextValue = {
  orders: Order[];
  saveOrder: (order: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  tailoring: TailoringRequest[];
  saveTailoring: (item: TailoringRequest) => void;
  updateTailoring: (id: string, patch: Partial<TailoringRequest>) => void;
  appointments: AppointmentRequest[];
  saveAppointment: (item: AppointmentRequest) => void;
  updateAppointment: (id: string, patch: Partial<AppointmentRequest>) => void;
  measurements: MeasurementSet[];
  saveMeasurement: (item: MeasurementSet) => void;
  deleteMeasurement: (id: string) => void;
  addresses: Address[];
  saveAddress: (item: Address) => void;
  deleteAddress: (id: string) => void;
  catalogue: Product[];
  saveProduct: (item: Product) => void;
  deleteProduct: (id: string) => void;
  discounts: DiscountCode[];
  saveDiscounts: (items: DiscountCode[]) => void;
  delivery: DeliveryConfig;
  saveDelivery: (item: DeliveryConfig) => void;
  featuredIds: string[];
  saveFeatured: (ids: string[]) => void;
};

const RecordsContext = createContext<RecordsContextValue | null>(null);

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = usePersisted<Order[]>(storageKeys.orders, emptyOrders);
  const [tailoring, setTailoring] = usePersisted<TailoringRequest[]>(storageKeys.tailoring, emptyTailoring);
  const [appointments, setAppointments] = usePersisted<AppointmentRequest[]>(
    storageKeys.appointments,
    emptyAppointments,
  );
  const [measurements, setMeasurements] = usePersisted<MeasurementSet[]>(
    storageKeys.measurements,
    emptyMeasurements,
  );
  const [addresses, setAddresses] = usePersisted<Address[]>(storageKeys.addresses, emptyAddresses);
  const [overrides, setOverrides] = usePersisted<Product[]>(storageKeys.products, emptyProducts);
  const [discounts, setDiscounts] = usePersisted<DiscountCode[]>(storageKeys.discounts, demoDiscountCodes);
  const [delivery, setDelivery] = usePersisted<DeliveryConfig>(storageKeys.delivery, defaultDeliveryConfig);
  const [featuredIds, setFeaturedIds] = usePersisted<string[]>(storageKeys.featured, emptyFeatured);

  const saveOrder = useCallback(
    (order: Order) => {
      setOrders((current) => [order, ...current.filter((item) => item.id !== order.id)]);
    },
    [setOrders],
  );
  const updateOrder = useCallback(
    (id: string, patch: Partial<Order>) => {
      setOrders((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [setOrders],
  );
  const saveTailoring = useCallback(
    (item: TailoringRequest) => {
      setTailoring((current) => [item, ...current.filter((row) => row.id !== item.id)]);
    },
    [setTailoring],
  );
  const updateTailoring = useCallback(
    (id: string, patch: Partial<TailoringRequest>) => {
      setTailoring((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [setTailoring],
  );
  const saveAppointment = useCallback(
    (item: AppointmentRequest) => {
      setAppointments((current) => [item, ...current.filter((row) => row.id !== item.id)]);
    },
    [setAppointments],
  );
  const updateAppointment = useCallback(
    (id: string, patch: Partial<AppointmentRequest>) => {
      setAppointments((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [setAppointments],
  );
  const saveMeasurement = useCallback(
    (item: MeasurementSet) => {
      setMeasurements((current) => [item, ...current.filter((row) => row.id !== item.id)]);
    },
    [setMeasurements],
  );
  const deleteMeasurement = useCallback(
    (id: string) => {
      setMeasurements((current) => current.filter((item) => item.id !== id));
    },
    [setMeasurements],
  );
  const saveAddress = useCallback(
    (item: Address) => {
      setAddresses((current) => {
        const next = [item, ...current.filter((row) => row.id !== item.id)];
        return item.isDefault ? next.map((row) => ({ ...row, isDefault: row.id === item.id })) : next;
      });
    },
    [setAddresses],
  );
  const deleteAddress = useCallback(
    (id: string) => {
      setAddresses((current) => current.filter((item) => item.id !== id));
    },
    [setAddresses],
  );
  const saveProduct = useCallback(
    (item: Product) => {
      setOverrides((current) => [item, ...current.filter((row) => row.id !== item.id)]);
    },
    [setOverrides],
  );
  const deleteProduct = useCallback(
    (id: string) => {
      setOverrides((current) => {
        const exists = current.find((item) => item.id === id);
        if (exists) return current.filter((item) => item.id !== id);
        const seed = seedProducts.find((item) => item.id === id);
        if (!seed) return current;
        return [{ ...seed, inStock: false, stockCount: 0, name: `${seed.name} (archived)` }, ...current];
      });
    },
    [setOverrides],
  );

  const catalogue = useMemo(() => {
    const map = new Map(seedProducts.map((item) => [item.id, item]));
    overrides.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  }, [overrides]);

  const value = useMemo(
    () => ({
      orders,
      saveOrder,
      updateOrder,
      tailoring,
      saveTailoring,
      updateTailoring,
      appointments,
      saveAppointment,
      updateAppointment,
      measurements,
      saveMeasurement,
      deleteMeasurement,
      addresses,
      saveAddress,
      deleteAddress,
      catalogue,
      saveProduct,
      deleteProduct,
      discounts,
      saveDiscounts: setDiscounts,
      delivery,
      saveDelivery: setDelivery,
      featuredIds,
      saveFeatured: setFeaturedIds,
    }),
    [
      orders,
      saveOrder,
      updateOrder,
      tailoring,
      saveTailoring,
      updateTailoring,
      appointments,
      saveAppointment,
      updateAppointment,
      measurements,
      saveMeasurement,
      deleteMeasurement,
      addresses,
      saveAddress,
      deleteAddress,
      catalogue,
      saveProduct,
      deleteProduct,
      discounts,
      setDiscounts,
      delivery,
      setDelivery,
      featuredIds,
      setFeaturedIds,
    ],
  );

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords must be used within RecordsProvider");
  return ctx;
}
