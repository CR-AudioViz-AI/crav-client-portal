'use client'

import { useState } from 'react'
import { Home, Heart, MessageSquare, FileText, Bell, User, Calendar, Search } from 'lucide-react'

interface Property {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  saved: boolean
  status: 'recommended' | 'saved' | 'viewed'
}

const mockProperties: Property[] = [
  { id: '1', address: '123 Ocean Drive, Fort Myers FL', price: 450000, bedrooms: 3, bathrooms: 2, sqft: 2100, saved: true, status: 'saved' },
  { id: '2', address: '456 Palm Ave, Cape Coral FL', price: 325000, bedrooms: 2, bathrooms: 2, sqft: 1500, saved: false, status: 'recommended' },
  { id: '3', address: '789 Beach Blvd, Fort Myers Beach FL', price: 550000, bedrooms: 4, bathrooms: 3, sqft: 2800, saved: true, status: 'saved' },
]

const messages = [
  { id: '1', from: 'Your Agent', text: 'New properties match your search criteria', time: '2h ago', unread: true },
  { id: '2', from: 'Your Agent', text: 'Showing scheduled for tomorrow at 2 PM', time: '1d ago', unread: false },
]

const documents = [
  { id: '1', name: 'Pre-Approval Letter.pdf', date: '2024-11-15', size: '245 KB' },
  { id: '2', name: 'Offer Contract - 123 Ocean Dr.pdf', date: '2024-11-18', size: '512 KB' },
]

export default function ClientPortal() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [activeTab, setActiveTab] = useState<'properties' | 'messages' | 'documents'>('properties')

  const toggleSaved = (id: string) => {
    setProperties(props => props.map(p => p.id === id ? {...p, saved: !p.saved} : p))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Home Search</h1>
                <p className="text-sm text-gray-500">Welcome back, John</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Saved Properties</p>
                <p className="text-3xl font-bold text-gray-900">{properties.filter(p=>p.saved).length}</p>
              </div>
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Matches</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <Search className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-3xl font-bold text-gray-900">{messages.filter(m=>m.unread).length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Showings</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <Calendar className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'properties' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'messages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Messages {messages.filter(m=>m.unread).length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{messages.filter(m=>m.unread).length}</span>}
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Documents
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="space-y-4">
                {properties.map(property => (
                  <div key={property.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Home className="w-12 h-12 text-white/50" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{property.address}</h3>
                          <p className="text-2xl font-bold text-green-600">${property.price.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => toggleSaved(property.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Heart className={`w-6 h-6 ${property.saved ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        <span>{property.bedrooms} beds</span>
                        <span>•</span>
                        <span>{property.bathrooms} baths</span>
                        <span>•</span>
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                          Schedule Showing
                        </button>
                        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`p-4 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-8 h-8 text-gray-400" />
                        <div>
                          <p className="font-semibold text-gray-900">{msg.from}</p>
                          <p className="text-sm text-gray-600">{msg.time}</p>
                        </div>
                      </div>
                      {msg.unread && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">New</span>}
                    </div>
                    <p className="text-gray-700 ml-10">{msg.text}</p>
                    <div className="mt-3 ml-10">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Reply</button>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Send New Message
                </button>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-10 h-10 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Next Steps in Your Home Search</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <Calendar className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">Schedule Showings</p>
              <p className="text-sm text-white/80">Book viewings for saved properties</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Search className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">Refine Your Search</p>
              <p className="text-sm text-white/80">Update your preferences</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">Contact Your Agent</p>
              <p className="text-sm text-white/80">Questions? We're here to help</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
