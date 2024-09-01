export interface ChargingStation {
    // Existing fields
    id?: string;
    name: string;
    type: StationType;
    capacity: number;
    status: StationStatus;
    bookingOptions: BookingOptions;
    pricePerChargingSession: number;
    durationOfChargingSession: ChargingDuration;
    location: Location;
    connectors: Connector[];
    availabilities: Availability[];
    images: string[];
    contactOptions: ContactOptions;
  
    // New fields
    energySource: EnergySource[];
    maxPowerOutput: number; // in kW
    paymentMethods: PaymentMethod[];
    accessibilityFeatures: AccessibilityFeature[];
    amenities: Amenity[];
    networkOperator: string;
    lastMaintenanceDate: Date;
    nextScheduledMaintenanceDate: Date;
    safetyFeatures: SafetyFeature[];
    ownerOperator: string;
  }
  
  export interface Connector {
    // Existing fields
    id?: number;
    connectorType: ConnectorType;
    power: number;
    chargingSpeed: number;
    connectorFormat: string;
    powerType: string;
    intensity: number;
    voltage: number;
    quantity: number;
  
    // New field
    status: ConnectorStatus;
  }
  
  // New enums and types
  export enum EnergySource {
    GRID = 'GRID',
    SOLAR = 'SOLAR',
    WIND = 'WIND',
    MIXED = 'MIXED'
  }
  
  export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    MOBILE_APP = 'MOBILE_APP',
    RFID_CARD = 'RFID_CARD',
    CASH = 'CASH'
  }
  
  export enum AccessibilityFeature {
    WHEELCHAIR_ACCESSIBLE = 'WHEELCHAIR_ACCESSIBLE',
    WELL_LIT = 'WELL_LIT',
    EASY_ACCESS_PARKING = 'EASY_ACCESS_PARKING'
  }
  
  export enum Amenity {
    RESTROOMS = 'RESTROOMS',
    CAFE = 'CAFE',
    SHOP = 'SHOP',
    WIFI = 'WIFI',
    SEATING_AREA = 'SEATING_AREA'
  }
  
  export enum SafetyFeature {
    CCTV = 'CCTV',
    EMERGENCY_BUTTON = 'EMERGENCY_BUTTON',
    FIRE_EXTINGUISHER = 'FIRE_EXTINGUISHER',
    LIGHTING = 'LIGHTING'
  }
  
  export enum ConnectorStatus {
    OPERATIONAL = 'OPERATIONAL',
    OUT_OF_ORDER = 'OUT_OF_ORDER',
    MAINTENANCE = 'MAINTENANCE'
  }
  
  
  export interface Location {
    street: string;
    streetNumber: string;
    complementAddress?: string;
    city: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    instructions?: string;
  }
  

  
  export interface Availability {
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
  }
  
  export interface ContactOptions {
    allowWhatsApp: boolean;
    allowEmail: boolean;
    emailContact?: string;
    whatsAppNumber?: string;
  }
  
  export enum StationType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
  }
  
  export enum StationStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }
  
  export enum BookingOptions {
    NO_BOOKING = 'NO_BOOKING',
    REQUIRED = 'REQUIRED',
    OPTIONAL = 'OPTIONAL'
  }
  
  export enum ChargingDuration {
    THIRTY_MIN = 30,
    SIXTY_MIN = 60,
    NINETY_MIN = 90,
    ONE_TWENTY_MIN = 120
  }
  
  export enum ConnectorType {
    TYPE1 = 'TYPE1',
    TYPE2 = 'TYPE2',
    CCS = 'CCS',
    CHADEMO = 'CHADEMO'
  }
  
  export enum DayOfWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
  }