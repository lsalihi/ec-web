export interface ChargingStation {
    // Existing fields
    id?: string;
    name: string;
    accessibility: StationAccessibility;
    chargingSpedd : ChargingSpeed;
    capacity: number;
    status: StationStatus;
    bookingOptions: BookingOptions;
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
    pricePerChargingSession: number;
    durationOfChargingSession: ChargingDuration;
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
  
  export enum StationAccessibility {
    PUBLIC = 'Public',
    PRIVATE = 'Private'
  }
  
  export enum ChargingSpeed {
    FAST = 'Fast',
    SLOW = 'Slow'
  }  
  
  export enum StationStatus {
    AVAILABLE = 'Available',
    OUT_OF_ORDER = 'Out of Order',
    UNDER_CONSTRUCTION = 'Under Construction',
    //ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    DRAFT = 'Draft'
  }
  
  
  export enum BookingOptions {
    NO_BOOKING = 'No Booking',
    REQUIRED = 'Required',
    OPTIONAL = 'Optional'
  }
  
  export enum ChargingDuration {
    THIRTY_MIN = 30,
    SIXTY_MIN = 60,
    NINETY_MIN = 90,
    ONE_TWENTY_MIN = 120
  }  
  
  export enum ConnectorType {
    TYPE1 = 'Type 1 (J1772)',
    TYPE2 = 'Type 2 (Mennekes)',
    CCS = 'Combined Charging System (CCS)',
    CHADEMO = 'CHAdeMO',
    TESLA_SUPERCHARGER = 'Tesla Supercharger',
    TESLA_DESTINATION = 'Tesla Destination Charger',
    GB_T = 'GB/T (China Standard)'
  }  
  
  export enum DayOfWeek {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
  }
  
  export enum EnergySource {
    GRID = 'Grid Power',
    SOLAR = 'Solar Power',
    WIND = 'Wind Power',
    MIXED = 'Mixed Energy Sources'  // This could represent any combination of the above
  }
  
  export enum PaymentMethod {
    CREDIT_CARD = 'Credit Card',
    DEBIT_CARD = 'Debit Card',
    MOBILE_APP = 'Mobile App Payment',
    RFID_CARD = 'RFID Card',
    CASH = 'Cash'
  }
  export enum AccessibilityFeature {
    WHEELCHAIR_ACCESSIBLE = 'Wheelchair Accessible',
    WELL_LIT = 'Well-Lit Environment',
    EASY_ACCESS_PARKING = 'Easy Access Parking'
  }
  export enum Amenity {
    RESTROOMS = 'Public Restrooms',
    CAFE = 'Café',
    SHOP = 'Convenience Shop',
    WIFI = 'Free Wi-Fi Access',
    SEATING_AREA = 'Seating Area'
  }
      
  export enum SafetyFeature {
    CCTV = 'CCTV Cameras',
    EMERGENCY_BUTTON = 'Emergency Call Button',
    FIRE_EXTINGUISHER = 'Fire Extinguisher',
    LIGHTING = 'Adequate Lighting',
    SURVEILLANCE_CAMERAS = 'Surveillance Cameras',
    SECURITY_PERSONNEL = 'Security Personnel',
    FENCING = 'Security Fencing'
  }  
  
  export enum ConnectorStatus {
    OPERATIONAL = 'Operational',
    OUT_OF_ORDER = 'Out of Order',
    MAINTENANCE = 'Under Maintenance',
    INACTIVE = 'Inactive'
  }  
