const Vaccine = require('../models/Vaccine');

// @desc    Get all vaccines
// @route   GET /api/vaccines
// @access  Public
const getVaccines = async (req, res) => {
  try {
    const { search, sortBy = 'name', sortOrder = 'asc', ageGroup } = req.query;
    let query = { isActive: true };
    if (ageGroup && ageGroup !== 'all') {
      query.ageGroups = { $in: [ageGroup, 'all'] };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const vaccines = await Vaccine.find(query).sort(sortObj);
    res.json({
      success: true,
      count: vaccines.length,
      data: vaccines
    });
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vaccines'
    });
  }
};

// @desc    Get single vaccine
// @route   GET /api/vaccines/:id
// @access  Public
const getVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.id);
    if (!vaccine) {
      return res.status(404).json({
        success: false,
        message: 'Vaccine not found'
      });
    }
    res.json({
      success: true,
      data: vaccine
    });
  } catch (error) {
    console.error('Error fetching vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vaccine'
    });
  }
};

// @desc    Create new vaccine (Admin only)
// @route   POST /api/vaccines
// @access  Private/Admin
const createVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.create(req.body);
    res.status(201).json({
      success: true,
      data: vaccine
    });
  } catch (error) {
    console.error('Error creating vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating vaccine'
    });
  }
};

// @desc    Update vaccine (Admin only)
// @route   PUT /api/vaccines/:id
// @access  Private/Admin
const updateVaccine = async (req, res) => {
  try {
    // Convert availability to Date if present and is a string
    if (req.body.availability && typeof req.body.availability === 'string') {
      req.body.availability = new Date(req.body.availability);
    }
    const vaccine = await Vaccine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vaccine) {
      return res.status(404).json({
        success: false,
        message: 'Vaccine not found'
      });
    }
    res.json({
      success: true,
      data: vaccine
    });
  } catch (error) {
    console.error('Error updating vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating vaccine'
    });
  }
};

// @desc    Delete vaccine (Admin only)
// @route   DELETE /api/vaccines/:id
// @access  Private/Admin
const deleteVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (!vaccine) {
      return res.status(404).json({
        success: false,
        message: 'Vaccine not found'
      });
    }
    res.json({
      success: true,
      message: 'Vaccine deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting vaccine'
    });
  }
};

module.exports = {
  getVaccines,
  getVaccine,
  createVaccine,
  updateVaccine,
  deleteVaccine
};